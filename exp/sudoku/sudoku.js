var sudoku = angular.module('sudoku', []);

function SudokuController($scope) {
    
    this.board = [[]];
    this.board[0].push(5);
    this.board[0].push(5);
    
    this.validate = function (board) {
        
    };
    
    this.solve = function (board) {
        
    };
    
    
}
sudoku.controller('sudokuController', SudokuController);