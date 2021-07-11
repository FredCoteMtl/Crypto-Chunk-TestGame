pragma solidity ^0.4.8;

contract SimpleStorage {
    uint chunkSize;
    mapping(uint => bytes) locList;
    mapping(bytes => bytes) blocksCol;
    
    constructor() public {
        chunkSize = 0;
    }
    
    function set(bytes loc, bytes col) public {
        chunkSize = chunkSize + 1;
        locList[chunkSize] = loc;
        blocksCol[loc] = col;
    }
    
    function setProgress(uint size, bytes locs, bytes cols) public {
        uint j = 0;
        for(uint i=0; i<size*2; i=i+2){
            set(abi.encodePacked(locs[i], locs[i+1]), abi.encodePacked(cols[j], cols[j+1], cols[j+2]));
            j = j + 3;
        }
    }
    
    function getChunkSize() public view returns (uint) {
        return chunkSize;
    }
    
    function getColWithIndex(uint i) public view returns (bytes) {
        bytes storage loc = locList[i];
        return blocksCol[loc];
    }
    function getColWithLoc(bytes loc) public view returns (bytes) {
        return blocksCol[loc];
    }
    
    function getLoc(uint i) public view returns (bytes) {
        return locList[i];
    }
    
    function resetChunk() public {
        chunkSize = 0;
    }
}