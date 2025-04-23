pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                script {
                    // Checkout the 'main' branch from your repository
                    git branch: 'main', url: 'https://github.com/Morningstar-08/employee360.git'
                }
            }
        }
        stage('Compose') {
            steps {
                // Change directory and run docker-compose in the same shell invocation
                bat '''
                    docker-compose up -d
                '''
            }
        }
    }
}