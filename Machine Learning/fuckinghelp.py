from sklearn.neighbors import NearestNeighbors
import numpy as np
import matplotlib.pyplot as plt 
from sklearn import datasets
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.svm import SVR
import math

bc = datasets.load_breast_cancer()
X = bc.data

scaler = StandardScaler()
X = scaler.fit_transform(X)
X.shape

pca = PCA(n_components=2)
X = pca.fit_transform(X)

X.shape


def get_kdist_plot(X=None, k=None, radius_nbrs=1.0):
    
    nbrs = NearestNeighbors(n_neighbors=k, radius=radius_nbrs).fit(X)

    # For each point, compute distances to its k-nearest neighbors
    distances, indices = nbrs.kneighbors(X) 
                                       
    distances = np.sort(distances, axis=0)
    distances = distances[:, k-1]
    svr_rbf = SVR(kernel="rbf", C=100, gamma=0.1, epsilon=0.1)
    print(svr_rbf)

    #Derivada da função gerada pelo KNN para achar o melhor valor possível do epsilon
    def objective_function(val):
        return ((distances[val+1] - distances[val])) 

    # Parâmetros do Algoritmo Hill Climbing
    initial_solution = 520 # Solução inicial
    step_size = 1  # Tamanho do passo para procurar soluções vizinhas
    max_iterations = 1000  # Número máximo de iterações
   

    # Algoritmo Hill Climbing
    def hill_climbing():
        current_solution = initial_solution
        current_value = objective_function(int(current_solution))

        for iteration in range(max_iterations):
            # Gerar solução vizinha
            neighbor = current_solution + np.random.uniform(-step_size, step_size)
            neighbor_value = objective_function(int(neighbor))

            # Se a solução vizinha for melhor, mover para ela
            if neighbor_value > current_value:
                current_solution = int(neighbor)
                current_value = neighbor_value

        return current_solution, current_value

    # Executar o Algoritmo Hill Climbing
    best_solution, best_value = hill_climbing()
    print(f"\nMelhor solução encontrada: {best_solution}")
    print(f"Valor da função objetivo na melhor solução: {best_value}")
    print(f"Valor possível do epsilon: {distances[int(best_solution)]}")

    # Plot the sorted K-nearest neighbor distance for each point in the dataset
    plt.figure(figsize=(8,8))
    plt.plot(svr_rbf.fit(distances[indices], distances).predict(distances[indices]))
    plt.plot(distances)
    plt.xlabel('Points/Objects in the dataset', fontsize=12)
    plt.ylabel('Sorted {}-nearest neighbor distance'.format(k), fontsize=12)
    plt.grid(True, linestyle="--", color='black', alpha=0.4)
    plt.show()
    plt.close()


k = 2 * X.shape[-1] - 1 # k=2*{dim(dataset)} - 1
get_kdist_plot(X=X, k=k)