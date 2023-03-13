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
    -> To find filename clues in the files comments
    python srcProcessor.py --clues
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

clues_obj = []
file_list = []

def clues(filename):
    global processed
    global clues
    global file_list
    # If the file content matches the regex \/\*\*[\s\S]*?\*\/ then we have to extract the content of the file name, for example, in the lines:
    f = open(filename, "r+", encoding="utf8")
    text = f.read()
    f.close()
    old_filename = filename.split("/")[-1]
    filename_regex = r'/\*\*\s*\n\s\*\s(.+?\.js)\n'
    comment_regex = r'\/\*\*[\s\S]*?\*\/'

    # Find the comment in the text and extract its description and filename
    comments = re.findall(comment_regex, text)
    total_filenames_found = 0
    filenames_found = []
    for comment_text in comments:
        filename_matches = re.findall(filename_regex, comment_text)
        if filename_matches:
            for found_filename in filename_matches:
                clues_obj.append(found_filename)
                filenames_found.append(found_filename)
                total_filenames_found += 1
    if total_filenames_found > 0:
        new_filename = filenames_found[0]
        log("- File: " + filename)
        if total_filenames_found > 1:
            log("  [!] This file can't be renamed automatically, please manually review and rename it")
        else:
            log("  [-] Renaming file to " + new_filename)
            # Check if the file already exists
            if os.path.exists(SRC_DIR + "/" + new_filename):
                log("  [!] The file " + new_filename + " already exists, not renaming")
            else:
                os.rename(filename, SRC_DIR + "/" + new_filename)
            if new_filename not in file_list:
                file_list.append(new_filename)
                file_list.remove(old_filename)
            log("  [-] Finding and replacing references to the old file name")
            found_references = 0
            for file in file_list:
                if file in IGNORED_FILES:
                    continue
                f = open(SRC_DIR + "/" + file, "r+", encoding="utf8")
                lines = f.readlines()
                # We have to search for lines that contains references like "require("./x.js")" and replace them with the new file name: "require("./y.js")"
                for line in lines:
                    matches = re.findall(r'require\("./[a-zA-Z0-9]*\.js"\)', line)
                    if matches:
                        for match in matches:
                            match = re.search(r'"(.*?)"', match).group(1)
                            if match == "./" + old_filename:
                                if match == "./" + new_filename:
                                    log("  [!] Reference fixed already, skipping")
                                    continue
                                # Replace the line with the new one
                                line_found_at = lines.index(line)
                                line = line.replace("./" + old_filename, "./" + new_filename)
                                f.seek(0)
                                f.writelines(lines[:line_found_at] + [line] + lines[line_found_at + 1:])
                                log("    Replacing reference to " + old_filename + " in file " + file + " at line " + str(line_found_at) + " with " + new_filename)
                                found_references += 1
                f.close()
            w = "reference"
            if found_references == 1:
                w = "references"
            log("  [-] Found and replaced " + str(found_references) + w + " to the old file name")
    processed += 1

def processdir(dirname: str, procedure):
    global logfile
    global file_list
    if "-logfile" in cmd_args:
        logfile = open("srcProcessor.log", "a", encoding="utf8")
        logfile.write("----- Procedure: " + procedure.__name__ + " at " + str(datetime.now()) + " -----\n")
    files = os.listdir(dirname)
    file_list = files.copy()
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
elif cmd_args[1] == "--clues":
    processdir(SRC_DIR, clues)
else:
    print("Invalid arguments, use --rename, --fixlines, --faultyfiles or --fixrefs")