# Importar bibliotecas necessárias
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.cluster import DBSCAN
from sklearn import datasets
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.model_selection import train_test_split #Permite a separação dos dados em "treinamento" e "teste"
from sklearn.neighbors import KNeighborsClassifier #Importa o método SVM, na forma de SVC

from sklearn import metrics

def true_label(): #Utilizando SVM como os "verdadeiros" rótulos
    # Dividir o conjunto de dados em treino e teste, com 30% dos dados para teste, e o resto para treinamento
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42) #Divisão dos dados

    # Treinar o modelo de SVM
    nb_classifier = KNeighborsClassifier(n_neighbors=3)
    nb_classifier.fit(X_train, y_train)
    return nb_classifier.predict(X)


# Carregar o dataset de Câncer de Mama
bc = datasets.load_breast_cancer()
X,y = bc.data, bc.target


# Opcional: Padronizar os dados para que tenham média 0 e variância 1
scaler = StandardScaler()
X = scaler.fit_transform(X)

X.shape

# Aplicar PCA para reduzir a dimensionalidade para 2D 
pca = PCA(n_components=2)
X = pca.fit_transform(X)

X.shape

#Aplicar o DBSCAN com um epsilon de 1.25 e um número de amostras mínimas de 4. O número de amostras mínimas foi calculada pelo dobro da dimensionalidade (2, devido ao método de PCA)
#O epsilon foi cálculado com base no KNN, que será demonstrado no próximo código

db = DBSCAN(eps=0.81, min_samples=4) 
db.fit(X)
core_samples_mask = np.zeros_like(db.labels_, dtype=bool)
core_samples_mask[db.core_sample_indices_] = True
labels = db.labels_

#Número de clusters
n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)

#Métrica do Índice Rand Ajustado
print(f"Adjusted Rand Index: {metrics.adjusted_rand_score(true_label(), labels):.3f}")
#Métrica do Índice de Silhueta
print(f"Silhouette Coefficient: {metrics.silhouette_score(X, labels):.3f}")
 
# Plotar o gráfico com os clusters
unique_labels = set(labels)
colors = [plt.cm.Spectral(each) for each in np.linspace(0, 1, len(unique_labels))]

for k, col in zip(unique_labels, colors):
    if k == -1:
        # Removendo o ruído
        col = 'k'
 
    class_member_mask = (labels == k)
 
    xy = X[class_member_mask & core_samples_mask]
    plt.plot(xy[:, 0], xy[:, 1], 'o', markerfacecolor=col,
             markeredgecolor='k',
             markersize=6)
 
    xy = X[class_member_mask & ~core_samples_mask]
    plt.plot(xy[:, 0], xy[:, 1], 'o', markerfacecolor=col,
             markeredgecolor='k',
             markersize=6)
 
plt.title('Número de Clusters: %d' % n_clusters_)
plt.show()
