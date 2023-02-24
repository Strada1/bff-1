"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrongMovieId = exports.invalidMovie = exports.movie = void 0;
exports.movie = {
    title: 'test!',
    year: 1234,
    duration: 200,
    category: '63e382d1848d4c8af8847773',
    director: '63de2aa638e756a3922dfc0b',
    description: 'test',
};
exports.invalidMovie = {
    title: '',
    year: 124,
    duration: 'x',
    category: '63e382d1848d4c8af884773',
    director: '63de2aa638e756a3922dfcb',
    description: '',
};
exports.wrongMovieId = '63e382d1848d4c8af8847773';
