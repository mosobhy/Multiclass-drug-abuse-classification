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
#### `-Alignment`
#### `-Resizing`
#### `-ROI segmentation`
#### `-Normalization`

## 3. Feature Extraction
#### `-SURF(speeded-up robust features) image descriptor`
#### `-SIFT(scale-invariant feature transform) image descriptor`

## 4. Feature Selection
#### `-RFE (Recursive feature elimination) alogrithm`
#### `-PCA (Principle component analysis) alogrithm`

## 5. Multiclass model training
#### `-Train a Random Forest and Support Vector Machine`

## 6. Model initial testing

## 7. Hyperparameters tuning

## 8. Model evaluation
### `Conf matrix 'precision, Recall, F-measure'`
### `AUC score`

## 9. Model Deployment
## `Model optimization for mobile usage`
## `Saving the model`
