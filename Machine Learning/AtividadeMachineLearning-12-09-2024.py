# Importar as bibliotecas necessárias
import numpy as np
from sklearn.svm import SVC #Importa o método SVM, na forma de SVC
from sklearn.neighbors import KNeighborsClassifier #Importa o método KNN
from sklearn.datasets import load_iris #Importa o dataset Iris
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split #Permite a separação dos dados em "treinamento" e "teste"
from sklearn.preprocessing import StandardScaler #Função que normaliza vetores
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix #Métricas para medir a qualidade dos métodos
import matplotlib.pyplot as plt #Criação de gráficos
import seaborn as sns #Visualização de gráficos, especificamente a matriz de confusão

# Carregar o conjunto de dados Iris
iris = load_breast_cancer()
X, y = iris.data, iris.target #X = características do conjunto de dados, y = classes a serem utilizadas nos dados

import pandas as pd #Biblioteca que permite a criação de dataframes

# 2. Criar um DataFrame para as características (X) e adicionar a coluna de classes (y)
df = pd.DataFrame(X, columns=iris.feature_names) #Cria a tabela de dados (dataframe)
df['target'] = y #Define o valor alvo

# 3. Exibir as 10 primeiras linhas do DataFrame
print(df.columns)

# Dividir o conjunto de dados em treino e teste, com 30% dos dados para teste, e o resto para treinamento
statenumber = int(round(np.random.random()*100)) #Aleatóriedade do estado
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=59) #Divisão dos dados

# Normalizar os dados
print("Dados de treinamento: ", X_train)
print("Dados de teste: ", X_test)
#print("Estado aleatório: 1")
#print("Estado aleatório: ", statenumber)

'''scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)'''

# Treinar o modelo de SVM
dt_classifier = SVC(kernel='linear')
dt_classifier.fit(X_train, y_train)
y_pred_dt = dt_classifier.predict(X_test)

# Treinar o modelo de KNN
nb_classifier = KNeighborsClassifier(n_neighbors=5)
nb_classifier.fit(X_train, y_train)
y_pred_nb = nb_classifier.predict(X_test)

# Printar SVM
print("SVM")
print("Acurácia:", accuracy_score(y_test, y_pred_dt))
print("Relatório de Classificação:\n", classification_report(y_test, y_pred_dt))
print("Matriz de Confusão:")
sns.heatmap(confusion_matrix(y_test, y_pred_dt), annot=True, fmt='d', cmap='Blues')
plt.title('Matriz de Confusão - SVM')
plt.xlabel('Predito')
plt.ylabel('Verdadeiro')
plt.show()

# Printar KNN
print("\nKNN")
print("Acurácia:", accuracy_score(y_test, y_pred_nb))
print("Relatório de Classificação:\n", classification_report(y_test, y_pred_nb))
print("Matriz de Confusão:")
sns.heatmap(confusion_matrix(y_test, y_pred_nb), annot=True, fmt='d', cmap='Greens')
plt.title('Matriz de Confusão - KNN')
plt.xlabel('Predito')
plt.ylabel('Verdadeiro')
plt.show()