export const mockData = {
  id: 'board-1',
  columnOrder: ['column-2', 'column-1'],
  columns: [
    {
      id: 'column-1',
      boardId: 'board-1',
      title: 'To Do',
      cardOrder: [
        'card-1',
        'card-2',
        'card-3',
        'card-5',
        'card-6',
        'card-7',
        'card-4',
        'card-8',
        'card-9',
      ],
      cards: [
        {
          id: 'card-1',
          boardId: 'board-1',
          columnId: 'column-1',
          title: 'Research Smarty 1',
          description: 'Long',
        },
        {
          id: 'card-2',
          boardId: 'board-1',
          columnId: 'column-1',
          title: 'Research MySQL 2',
          description: 'Long',
        },
        {
          id: 'card-3',
          boardId: 'board-1',
          columnId: 'column-1',
          title: 'Research PHP 3',
          description: 'Long',
        },
        {
          id: 'card-9',
          boardId: 'board-1',
          columnId: 'column-1',
          title: 'Research PHP 9',
          description: 'Long',
        },
        {
          id: 'card-4',
          boardId: 'board-1',
          columnId: 'column-1',
          title: 'Research PHP 4',
          description: 'Long',
        },
        {
          id: 'card-5',
          boardId: 'board-1',
          columnId: 'column-1',
          title: 'Research PHP 5',
          description: 'Long',
        },
        {
          id: 'card-6',
          boardId: 'board-1',
          columnId: 'column-1',
          title: 'Research PHP 6',
          description: 'Long',
        },
        {
          id: 'card-7',
          boardId: 'board-1',
          columnId: 'column-1',
          title: 'Research PHP 7',
          description: 'Long',
        },
        {
          id: 'card-8',
          boardId: 'board-1',
          columnId: 'column-1',
          title: 'Research PHP 8',
          description: 'Long',
        },
      ],
    },
    {
      id: 'column-2',
      boardId: 'board-1',
      title: 'Doing',
      cardOrder: ['card-4', 'card-5', 'card-6'],
      cards: [
        {
          id: 'card-4',
          boardId: 'board-1',
          columnId: 'column-2',
          title: 'Research 4',
          description: 'Long',
        },
        {
          id: 'card-5',
          boardId: 'board-1',
          columnId: 'column-2',
          title: 'Research 5',
          description: 'Long',
        },
        {
          id: 'card-6',
          boardId: 'board-1',
          columnId: 'column-2',
          title: 'Research 6',
          description: 'Long',
        },
      ],
    },
  ],
};
