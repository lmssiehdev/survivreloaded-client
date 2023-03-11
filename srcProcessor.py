'''
This script is used to rename the files in the original src directory to the name specified in the first line of each file.
'''

import os
import re

IGNORED_FILES = ["top_text.js"]
SRC_DIR = "./src"

processed = 0

def processfile(filename):
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

def processdir(dirname):
    files = os.listdir(dirname)
    print("Processing " + str(len(files)) + " files in " + dirname)
    for filename in files:
        if filename in IGNORED_FILES:
            continue
        processfile(dirname + "/" + filename)
    print("-> Processed " + str(processed) + "/" + str(len(files)) + " files (" + str(len(IGNORED_FILES)) + " ignored)")

processdir(SRC_DIR)