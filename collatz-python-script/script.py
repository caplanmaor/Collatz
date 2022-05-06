from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import os
import urllib.request
import glob
from PIL import Image

driver  = webdriver.Chrome(executable_path=r"/home/maor/Downloads/chromedriver")
frames = glob.glob(os.getcwd()+"/frames/*.jpg")
for i,frame in enumerate(frames):
    driver.get("https://www.text-image.com/convert/")
    driver.maximize_window()
    wait = WebDriverWait(driver, 1)

    driver.find_element_by_id("fileinput").send_keys(frame)
    driver.find_element_by_id("submission").click()
    wait = WebDriverWait(driver, 1)

    img = driver.find_element_by_id('tiresult')
    driver.execute_script("arguments[0].scrollIntoView(true);", img);
    wait = WebDriverWait(driver, 1)

    img = driver.find_element_by_id('tiresult')
    location = img.location_once_scrolled_into_view;
    size = img.size;
    driver.save_screenshot("pageImage.png");

    # crop image
    im = Image.open('pageImage.png')
    left = location['x']
    top = location['y'] 
    right = location['x'] + size['width'] -1
    bottom = location['y'] + size['height']
    im = im.crop((left, top, right, bottom))
    im.save(os.getcwd()+f'/export/{frame[-7:-4]}.png')

   
driver.close();