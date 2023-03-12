'''
This script is used to rename the files in the original src directory to the name specified in the first line of each file.
Usage: 
    -> To rename all files in the directory
    python srcProcessor.py 
    - or
    python srcProcessor.py --rename
    -> To fix the headers, empty function references and last empty lines of all files in the directory
    python srcProcessor.py --fixlines
    -> To find the files that have a faulty line, which means they contain a line that matches the webpack naming pattern
    python srcProcessor.py --faultyfiles
    -> To change webpack references to the new file names
    python srcProcessor.py --fixrefs
Additional arguments:
    -logfile: The script will log all the operations to a file named "srcProcessor.log"
'''

import os
import re
import sys
from datetime import datetime

IGNORED_FILES = ["top_text.js"]
SRC_DIR = "./src"

processed = 0
cmd_args = sys.argv
logfile = None

def renamefile(filename):
    global processed
    f = open(filename, encoding="utf8")
    firstline = f.readline()
    f.close()
    # We want to extract the string between the quotes
    match = re.search(r'"(.*?)"', firstline)
    if match:
        # Rename the file to the string we extracted (+ .js)
        newfilename = SRC_DIR + "/" + match.group(1) + ".js"
        log("Renaming " + filename + " to " + newfilename)
        processed += 1
        try:
            os.rename(filename, newfilename)
        except FileExistsError:
            log(match.group(1) + ".js already exists, skipping")
        except:
            log("Error renaming " + filename + " to " + newfilename)
    else:
        log("No match for " + filename)

def resetFileSeek(f):
    f.seek(0)
    f.truncate()

def fixlines(filename):
    global processed
    f = open(filename, "r+", encoding="utf8")
    lines = f.readlines()
    # Remove the first three lines of the file
    resetFileSeek(f)
    f.writelines(lines[3:])
    # Remove the last three lines of the file
    f.seek(0)
    lines = f.readlines()
    resetFileSeek(f)
    f.writelines(lines[:-3])
    # Finally, remove the lines that start with specific patterns
    f.seek(0)
    lines = f.readlines()
    resetFileSeek(f)
    for line in lines:
        if not line.startswith("/***/ (function(module") and not line.startswith("/***/ })"):
            f.write(line)

def faultyfiles(filename):
    global processed
    f = open(filename, "r+", encoding="utf8")
    lines = f.readlines()
    for line in lines:
        if line.startswith("/***/ \"") or line.startswith("/* (ignored) */"):
            log(filename + " has a faulty line [" + str(lines.index(line)) + "]")
    processed += 1

def fixrefs(filename):
    global processed
    f = open(filename, "r+", encoding="utf8")
    lines = f.readlines()
    resetFileSeek(f)
    log("- File: " + filename)
    # Search for lines that contain "__webpack_require__("x")" and replace them with the new file name: "require("./x.js")"
    for line in lines:
        matches = re.findall(r'__webpack_require__\("[a-zA-Z0-9]*"\)', line)
        if matches:
            for match in matches:
                # Extract the string between the quotes
                match = re.search(r'"(.*?)"', match).group(1)
                # Replace the line with the new one
                line = line.replace("__webpack_require__(\"" + match + "\")", "require(\"./" + match + ".js\")")
                log("   Replaced " + match + " with ./" + match + ".js")
        f.write(line)
    processed += 1
    f.close()

def processdir(dirname: str, procedure):
    global logfile
    if "-logfile" in cmd_args:
        logfile = open("srcProcessor.log", "a", encoding="utf8")
        logfile.write("----- Procedure: " + procedure.__name__ + " at " + str(datetime.now()) + " -----\n")
    files = os.listdir(dirname)
    log("-> Processing " + str(len(files)) + " files in " + dirname)
    for filename in files:
        if filename in IGNORED_FILES:
            continue
        procedure(dirname + "/" + filename)
    log("-> Processed " + str(processed) + "/" + str(len(files)) + " files (" + str(len(IGNORED_FILES)) + " ignored)")
    if "-logfile" in cmd_args:
        logfile.close()

def log(msg):
    global logfile
    print(msg)
    if logfile:
        logfile.write("[" + str(datetime.now().time()) + "] " + msg + "\n")

if len(cmd_args) == 1 or cmd_args[1] == "--rename":
    processdir(SRC_DIR, renamefile)
elif cmd_args[1] == "--fixlines":
    processdir(SRC_DIR, fixlines)
elif cmd_args[1] == "--faultyfiles":
    processdir(SRC_DIR, faultyfiles)
elif cmd_args[1] == "--fixrefs":
    processdir(SRC_DIR, fixrefs)
else:
    print("Invalid arguments, use --rename, --fixlines, --faultyfiles or --fixrefs")