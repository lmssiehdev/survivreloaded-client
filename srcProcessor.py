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
'''

import os
import re
import sys

IGNORED_FILES = ["top_text.js"]
SRC_DIR = "./src"

processed = 0
cmd_args = sys.argv

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
        print("Renaming " + filename + " to " + newfilename)
        processed += 1
        try:
            os.rename(filename, newfilename)
        except FileExistsError:
            print(match.group(1) + ".js already exists, skipping")
        except:
            print("Error renaming " + filename + " to " + newfilename)
    else:
        print("No match for " + filename)

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
    # This function is used to find the files that have a faulty line, which means they contain a line that matches the pattern (example):
    # /***/ "f6271b77":
    # or
    # /* (ignored) */
    # which means haven't been processed by the renamefile function, or has a splitting error
    f = open(filename, "r+", encoding="utf8")
    lines = f.readlines()
    for line in lines:
        if line.startswith("/***/ \"") or line.startswith("/* (ignored) */"):
            print(filename + " has a faulty line [" + str(lines.index(line)) + "]")
    processed += 1

def processdir(dirname: str, procedure):
    files = os.listdir(dirname)
    print("Processing " + str(len(files)) + " files in " + dirname)
    for filename in files:
        if filename in IGNORED_FILES:
            continue
        procedure(dirname + "/" + filename)
    print("-> Processed " + str(processed) + "/" + str(len(files)) + " files (" + str(len(IGNORED_FILES)) + " ignored)")

if len(cmd_args) == 1 or cmd_args[1] == "--rename":
    processdir(SRC_DIR, renamefile)
elif cmd_args[1] == "--fixlines":
    processdir(SRC_DIR, fixlines)
elif cmd_args[1] == "--faultyfiles":
    processdir(SRC_DIR, faultyfiles)
else:
    print("Invalid arguments, use --rename or --fixlines")