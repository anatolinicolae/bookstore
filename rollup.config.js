require('dotenv').config();

import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';

export default {
    input: 'src/web/js/index.js',
    output: {
        file: 'dist/public/js/app.js',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [
        json(),
        copy({
            targets: [
                {src: 'src/web/index.html', dest: 'dist/public'},
            ],
        }),
        image(),
        postcss({
            extensions: ['.css'],
        }),
        nodeResolve({
            extensions: ['.js'],
            browser: true,
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
            preventAssignment: true,
        }),
        babel({
            presets: ['@babel/preset-react'],
            babelHelpers: 'bundled',
        }),
        commonjs(),
        process.env.NODE_ENV !== 'production' && livereload({watch: 'dist'}),
    ],
};
