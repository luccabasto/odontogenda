import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// Interface que define a estrutura de uma tarefa
interface Tarefa {
  id: number;
  titulo: string;
}

// Interface que define o contexto global de estado
interface ContextoEstadoGlobal {
  tarefas: Tarefa[];
  adicionarTarefa: (titulo: string) => void;
  editarTarefa: (id: number, novoTitulo: string) => void;
  excluirTarefa: (id: number) => void;
}

// Cria o contexto global de estado
const ContextoEstadoGlobal = createContext<ContextoEstadoGlobal>( {
  tarefas: [],
  adicionarTarefa: () => {},
  editarTarefa: () => {},
  excluirTarefa: () => {},
});

// Hook para acessar o contexto global de estado
export const useEstadoGlobal = () => useContext(ContextoEstadoGlobal);

// Componente que fornece o contexto global de estado para seus filhos
export const ProvedorEstadoGlobal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [isRecarregandoTela, setIsRecarregandoTela] = useState(true);

  const adicionarTarefa = (titulo: string) => {
    const novaTarefa: Tarefa = {
      id: Date.now(),
      titulo,
    };

    setTarefas([...tarefas, novaTarefa]);
    salvarTarefas([...tarefas, novaTarefa]); // Passa a nova lista para salvar
  };

  const editarTarefa = (id: number, novoTitulo: string) => {
    const novasTarefas = tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, titulo: novoTitulo } : tarefa
    );

    setTarefas(novasTarefas);
    salvarTarefas(novasTarefas);
  };

  const excluirTarefa = (id: number) => {
    const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
    setTarefas(novasTarefas);
    salvarTarefas(novasTarefas);
  };

  useEffect(() => {
    const carregarTarefas = async () => {
      try {
        const tarefasArmazenadas = await AsyncStorage.getItem('tarefas');
        if (tarefasArmazenadas) {
          setTarefas(JSON.parse(tarefasArmazenadas));
        }
      } catch (error) {
        console.error(error);
      }
      setIsRecarregandoTela(false);
    };
    carregarTarefas();
  }, []);

  useEffect(() => {
    salvarTarefas(tarefas);
  }, [tarefas]);

  const salvarTarefas = async (tarefas: Tarefa[]) => {
    if (!isRecarregandoTela) {
      try {
        await AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ContextoEstadoGlobal.Provider value={{ tarefas, adicionarTarefa, editarTarefa, excluirTarefa }}>
      {children}
    </ContextoEstadoGlobal.Provider>
  );
};
