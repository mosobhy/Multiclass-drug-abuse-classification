import cv2


def extractSURF(image_arr):
    '''
    input: gray scaled image array
    return: Extract the speeded-up robust features for an image
    '''
    
    surf = cv2.xfeatures2d.SURF_create(5)
    keypoints, descriptors = surf.detectAndCompute(image_arr, None)
    # print('SURF keypoints: ', keypoints)
    # print('SURF descriptors: ', descriptors)
    # print('shape of surf: ', descriptors.shape)
    return descriptors