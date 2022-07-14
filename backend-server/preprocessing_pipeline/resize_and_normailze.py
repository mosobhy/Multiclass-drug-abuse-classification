import cv2

def preprocessImage(image_arr):
    '''
    this function accepts an image and do the following:
        1. resize the image to 90 x 90 px
        2. convert the image to the grayScale
    returns a flatted representation of the image
    '''
    # resize image
    resized_image = cv2.resize(image_arr, (90, 90), interpolation = cv2.INTER_AREA)
    # convert to gray scale
    if resized_image.ndim == 3 and resized_image.shape[-1] == 3:   # this is an rgb colored image
        gray_image = cv2.cvtColor(resized_image, cv2.COLOR_BGR2GRAY)
    elif resized_image.ndim == 2:
        # its aleardy a gray image
        gray_image = resized_image
    else:
        raise Exception(f'{image_arr} is not supported')

    return gray_image
