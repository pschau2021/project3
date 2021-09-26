# from flask import Flask
# from flask import Response
# import json
# import os
from sklearn import svm
from sklearn import datasets
from sklearn.model_selection import train_test_split

# from pymongo import MongoClient
# client = MongoClient()

cancer = datasets.load_breast_cancer()
X_train, X_test, y_train, y_test = train_test_split(cancer.data, cancer.target, test_size=0.3,random_state=109) # 70% training and 30% test
clf = svm.SVC(kernel='linear')
#clf.fit(X_train, y_train)

#y_pred = clf.predict(X_test)

print(X_train)
print(y_train)


