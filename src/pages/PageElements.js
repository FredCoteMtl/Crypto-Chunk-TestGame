import styled from 'styled-components'

export const Page = styled.div`
    padding-bottom: 300px;
    justify-content: center;
    background: linear-gradient(90deg, rgba(0,158,176,1) 0%, rgba(0,24,218,1) 48%, rgba(9,9,121,1) 100%);
`;

export const GameWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const Header = styled.div`
    height: 150px;
    padding: 10px;
    background-color: rgba(255, 255, 255, .15);  
    backdrop-filter: blur(5px);
    margin-bottom: 15px;
    color: white;
    text-align: center;
`;

export const Title = styled.h1`

`;

export const Subtitle = styled.p`
    margin: 5px;
`;

export const LowerSection = styled.div`
    display: flex;
    justify-content: center;
`;

export const Menu = styled.div`
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    padding: 50px;
    background-color: rgba(255, 255, 255, .15);  
    backdrop-filter: blur(5px);
`;

export const Button = styled.button`
    margin: 10px;
    padding: 10px;
`;

export const Controls = styled.div`
    max-width: 400px;
    background-color: rgba(255, 255, 255, .15);  
    backdrop-filter: blur(5px);
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    color: white;
    padding: 10px;
`;

export const Howto = styled.div`
    max-width: 400px;
    background-color: rgba(255, 255, 255, .15);  
    backdrop-filter: blur(5px);
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    color: white;
    font-size: 12px;
    padding: 20px;
`;


export const Link = styled.a`
    color: red;
`;