import { createGlobalStyle } from 'styled-components';
import normalize from 'normalize.css';

export default createGlobalStyle`
    ${normalize}
   
    *, *:before, *:after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        --bg-positive: linear-gradient(to right, hsl(47deg 40% 50%), hsl(40deg 40% 56%));
        --bg-danger: linear-gradient(to right, hsl(21deg 40% 50%), hsl(26deg 40% 56%));
        --bg-negative: linear-gradient( to right, hsl(230deg 30% 60%), hsl(218deg 30% 50%));
        --bg-secondary: linear-gradient(to right, hsl(62deg 76% 67%), hsl(48deg 32% 60%));
    }
    body, 
    html {
        height: 100%;
        margin: 0;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
        background-color: #fff; 
        line-height: 1.4;
    }

        a:link, 
        a:visited {
        color: #0077cc;
    }

    a:hover, 
    a:focus {
        color: #004499;
    }

    code, 
    pre {
        max-width: 100%;
    }
    input {
        min-width: 50px;
    }
`;
