import cv2
import dlib
import numpy



PREDICTOR_PATH = "./shape_predictor_68_face_landmarks.dat" 
predictor = dlib.shape_predictor(PREDICTOR_PATH)
cascade =  cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def get_landmark(im):

  faces = cascade.detectMultiScale(im, 1.3, 5)
  if len(faces) != 0:
      for (x, y, w, h) in faces.astype(int):
          rect = dlib.rectangle(x, y, x + w, y + h)
          #cv2.imwrite('face.png', rect)
          get_landmarks = numpy.matrix([[p.x, p.y] for p in predictor(im, rect).parts()])
      #crop_img = img[y:y+h, x:x+w]
      return get_landmarks

def get_face(im):
  faces = cascade.detectMultiScale(im, 1.3, 5)
  return faces
  
# we need only to use this function from the client
def face(image):
  img = aligned_face(image)
  faces = get_face(img)

  x1 = faces[0,0]
  x2 = faces[0,1]

  y1 = faces[0,2]
  y2 = faces[0,3]

  #crop_img = img[y:y+h, x:x+w]
  crop_img = img[ x2:x2+y2,x1: x1+y1]

  return crop_img

def rotate(image, angle, center = None, scale = 1.0):
    (h, w) = image.shape[:2]

    if center is None:
        center = (w / 2, h / 2)

    # Perform the rotation
    M = cv2.getRotationMatrix2D(center, angle, scale)
    rotated = cv2.warpAffine(image, M, (w, h))

    return rotated

def aligned_face(img):

  landmark = get_landmark(img)

  x1 = landmark[41,0]
  x2 = landmark[47,0]

  y1 = landmark[41,1]
  y2 = landmark[47,1]

  m = (y2-y1)/(x2-x1)
  slop = m * 180 / 3.14

  rotated_face = rotate(img , slop)

  return rotated_face