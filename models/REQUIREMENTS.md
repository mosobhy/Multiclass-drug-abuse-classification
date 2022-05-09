# Multiclass drug abuse detection
## Model Construction
## 1. Load dataset from drive
*Data format*
```
├── dataset
│   ├── alcohol
│   │   ├── drug
│   │   └── normal
│   ├── BDZ
│   │   ├── drug
│   │   └── normal
│   ├── cannabis
│   │   ├── drug
│   │   └── normal
│   ├── esctasy
│   │   ├── drug
│   │   └── normal
│   └── organic_solvents
│       ├── drug
│       └── normal
```

## 2. Pipeline for data preprocessing
### 2.1 `Alignment`
### 2.2 `Resizing`
### 2.3 `ROI segmentation`
### 2.4 `Normalization`

## 3. Feature Extraction
### 3.1 `SURF(speeded-up robust features) image descriptor`
### 3.2 `SIFT(scale-invariant feature transform) image descriptor`

## 4. Feature Selection
### 4.1 `RFE (Recursive feature elimination) alogrithm`
### 4.2 `PCA (Principle component analysis) alogrithm`

## 5. Multiclass model training
### 5.1 `Train a Random Forest and Support Vector Machine`

## 6. Model initial testing

## 7. Hyperparameters tuning

## 8. Model evaluation
### `Conf matrix 'precision, Recall, F-measure'`
### `AUC score`

## 9. Model Deployment
## `Model optimization for mobile usage`
## `Saving the model`
