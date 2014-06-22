#!/usr/bin/python

import Image
import os

"""
Name: memify.py
Description: This class is a memification tool.
    It will handle the task of adding text to an image, given the image URI
    as well as some upper text and some lower text.
"""
class Memify:
    
    baseImagePath = "../img"
    memePath = "../memes"
    baseImageList = []

    def __init__(self):
        self.getBaseImages()
        self.showFirstImage()

    def getBaseImages(self):
        os.chdir(self.baseImagePath)
        self.baseImageList = os.listdir(self.baseImagePath)
        print self.baseImageList

    def showFirstImage(self):
        im = Image.open(self.baseImageList[0])
        print im.format, im.size, im.mode
        im.format = "JPEG"
        im.show()

if __name__=="__main__":
    memify = Memify()
