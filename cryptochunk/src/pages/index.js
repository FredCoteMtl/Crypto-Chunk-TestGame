import React, {useRef} from 'react'
import getBlockchain from '../ethereum';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers'
import { SketchPicker } from 'react-color';
import { 
    GameWrapper,
    Header,
    Page,
    Menu,
    Button,
    Title,
    Subtitle,
    Controls,
    LowerSection,
    Link
} from './PageElements';
import Viewer from '../Viewer/'; 
import README from '../documents/README_cryptochunk.pdf'

const HomePage = () => {  
    let contract = undefined;
    let toUpdate = 0;
    
    let cursorX = 1;
    let cursorY = 0;
    let cursorZ = 0;
    let color = '009900';

    let toUpdateLoc = '0x';
    let toUpdateCol = '0x';
    
    const vref = useRef();
    
    let loc = ['000'];
    const updateLoc =  (l) => { loc.push(l); }

    let col = ['009900'];
    const updateCol =  (c) => { col.push(c); }

    const updateChunk = (l, c) => {
        updateLoc(l);
        updateCol(c);
        vref.current.renderBlock(l, c);
    }

    const intToHex = (i) => {
        let t = i.toString(16);
        if(t.length < 2){
            return '0'+t;
        } else {
            return t;
        }
    }

    const handleColChange = (c) => {
        let r = intToHex(c.rgb.r);
        let g = intToHex(c.rgb.g);
        let b = intToHex(c.rgb.b);
        color = ''+r+g+b;
    }

    document.addEventListener('keydown', function(event){
		event.preventDefault();
        switch(event.key) {
            case 's':
                if(cursorZ > 0){
                    cursorZ = cursorZ - 1;
                    vref.current.renderCursor(cursorX, cursorY, cursorZ);
                }
            break;
            case 'w':
                if(cursorZ < 15){
                    cursorZ = cursorZ + 1;
                    vref.current.renderCursor(cursorX, cursorY, cursorZ);
                }
            break;
            case 'r':
                if(cursorY < 15){
                    cursorY = cursorY + 1;
                    vref.current.renderCursor(cursorX, cursorY, cursorZ);
                }
            break;
            case 'f':
                if(cursorY > 0){
                    cursorY = cursorY - 1;
                    vref.current.renderCursor(cursorX, cursorY, cursorZ);
                }
            break;
            case 'a':
                if(cursorX > 0){
                    cursorX = cursorX - 1;
                    vref.current.renderCursor(cursorX, cursorY, cursorZ);
                }
            break;
            case 'd':
                if(cursorX < 15){
                    cursorX = cursorX + 1;
                    vref.current.renderCursor(cursorX, cursorY, cursorZ);
                }
            break;
            case ' ':
                let tempLoc = cursorX.toString(16) + cursorY.toString(16) + cursorZ.toString(16);
                if(!loc.includes(tempLoc)){
                    updateChunk(tempLoc, color);
                    if(contract !== undefined) {
                        toUpdateLoc = toUpdateLoc + tempLoc + '0';
                        toUpdateCol = toUpdateCol + color;
                        toUpdate = toUpdate + 1;
                    }
                }
            break;
            case 'Backspace':
                tempLoc = cursorX.toString(16) + cursorY.toString(16) + cursorZ.toString(16);
                let i = loc.indexOf(tempLoc)
                if(i !== -1){
                    vref.current.removeBlock(i);
                    loc.splice(i,1);
                }
            break;
            default: 
        }
        //console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`);
    })

    const connectToMetaMask = async e => {
        e.preventDefault();

        const { SimpleStorage } = await getBlockchain();
        contract = SimpleStorage;

        let provider = await detectEthereumProvider();
        await provider.request({ method: 'eth_requestAccounts' });
        provider = new ethers.providers.Web3Provider(provider);
    };

    const loadChunk = async e => {
        e.preventDefault();
        try{
            const chunkSize = await contract.getChunkSize();
            for(let i=0;i<chunkSize;i++){
                const loadedLoc = await contract.getLoc(i+1);
                const loadedCol = await contract.getColWithIndex(i+1);
                updateChunk(loadedLoc.substring(2,5), loadedCol.substring(2));
            }
        } catch(TypeError){
            alert('Connect To Metamask first');
        }
    }

    const saveBlock = async e => {
        e.preventDefault();
        let tempLoc = cursorX.toString(16) + cursorY.toString(16) + cursorZ.toString(16);
        try{
            await contract.set('0x'+tempLoc+'0', '0x'+color);
        } catch (TypeError) {
            alert('Connect To Metamask first');
        }
    }

    const saveProgress = async e => {
        e.preventDefault();
        try{
            await contract.setProgress(toUpdate, toUpdateLoc, toUpdateCol);
        } catch (TypeError) {
            alert('Connect To Metamask first');
        }
        toUpdate = 0;
        toUpdateLoc = '0x';
        toUpdateCol = '0x';
    }

    const resetChunk = async e => {
        for(var i=0; i<loc.length; i++){
            vref.current.removeBlock(0);
        }
        toUpdate = 0;
        toUpdateLoc = '0x';
        toUpdateCol = '0x';
        loc = ['000'];
        col = ['009900'];
        try {
            await contract.resetChunk();
        } catch (TypeError) {
            alert('Connect To Metamask first');
        }
        
    }

    return (
        <Page>
            <Header>
                <Title>The Crypto Chunk</Title>
                <Subtitle>
                    This is a test to see how difficult it would be to store some game map info directly on the blockchain instead of using an URI.
                </Subtitle>
                <Subtitle>
                    This sample project was made by Frederic Cote. To view the code and{' '} 
                    <Link href={README} target={'_blank'}>
                        README
                    </Link> 
                    {' '}go to{' '}
                    <Link href={'https://github.com/FredCoteMtl'} target={'_blank'}>
                        Project Git
                    </Link>
                </Subtitle>
                <Subtitle>
                    Feel free to give me your comments or just come chat on{' '}
                    <Link href={'https://t.me/MothLabs'} target={'_blank'}>
                        Moth Labs Telegram
                    </Link>
                </Subtitle>
            </Header>
            <GameWrapper>
                <Viewer ref={vref} chunkLoc={loc} chunkCol={col}/>
                <SketchPicker onChangeComplete={(c) => handleColChange(c)}/>
            </GameWrapper>
            <LowerSection>
                <Controls>
                    <h2>Controls</h2>
                    <p>- Move the cursor on a plane with the A,D,W,S keys</p>
                    <p>- Move the cursor up and down with the R,F keys</p>
                    <p>- Press space bar to add a new block</p>
                    <p>- Press backspace to remove a block</p>
                    <p>- Move the view around using the arrow keys and the mouse</p>
                </Controls>
                <Menu>
                    <Button onClick={connectToMetaMask}>Connect Metamask</Button>
                    <Button onClick={loadChunk}>Load Chunk</Button>
                    <Button onClick={saveBlock}>save block</Button>
                    <Button onClick={saveProgress}>save progress</Button>
                    <Button onClick={resetChunk}>reset chunk</Button>
                </Menu>
            </LowerSection>
        </Page>
    )
}

export default HomePage
