// src/components/ErrorBoundary.jsx
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Atualiza o estado para exibir a UI de fallback.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Você pode também registrar o erro em um serviço de relatório de erros.
    console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI de fallback aqui.
      return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-800">
          <h1 className="text-white text-4xl">Algo deu errado.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
