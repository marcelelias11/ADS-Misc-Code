# Importar bibliotecas necessárias
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.cluster import KMeans
from sklearn import datasets
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

# Carregar o dataset de Cãncer de Mama
bc = datasets.load_breast_cancer()
X = bc.data

# Opcional: Padronizar os dados para que tenham média 0 e variância 1
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_scaled.shape

# Aplicar PCA para reduzir a dimensionalidade para 2D (apenas para visualização)
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

X_pca.shape

# Definir o modelo K-Means com 3 clusters (porque sabemos que existem 3 classes no dataset Iris)
kmeans = KMeans(n_clusters=2, random_state=42)

# Treinar o modelo nos dados
kmeans.fit(X_pca)

# Prever os clusters
y_kmeans = kmeans.predict(X_pca)

# Visualizar os clusters gerados pelo K-Means
plt.scatter(X_pca[:, 0], X_pca[:, 1], c=y_kmeans, s=50, cmap='viridis')

# Plotar os centróides dos clusters
centers = kmeans.cluster_centers_
plt.scatter(centers[:, 0], centers[:, 1], c='red', s=200, alpha=0.75, marker='X')
plt.title("Clusters gerados pelo K-Means (PCA aplicado)")
plt.xlabel("Componente Principal 1")
plt.ylabel("Componente Principal 2")
plt.show()
