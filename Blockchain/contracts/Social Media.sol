// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract SocialMedia {
    mapping(address => string) public usernames;

    struct Comments {
        string commenter;
        uint postId;
        string comment;
    }

    struct Post {
        uint postId;
        IERC721 nft;
        uint tokenId;
        string creator;
        uint likes;
        Comments[] comments;
    }

    uint public postCount = 0;
    mapping(address=>Comments[]) public userComments;
    mapping(address => Post[]) public userPosts;
    mapping(uint => Post) public allPosts;
    mapping(address => Post[]) public likedPosts;

    function walletExists(address _wallet) public view returns (bool) {
        return bytes(usernames[_wallet]).length > 0;
    }

    function createPost(IERC721 _nft, uint _tokenId) external {
        require(walletExists(msg.sender), "User does not exist");
        
        Post storage newPost = allPosts[postCount];
        newPost.postId = postCount;
        newPost.nft = _nft;
        newPost.tokenId = _tokenId;
        newPost.creator = usernames[msg.sender];
        newPost.likes = 0;
        postCount++;
        userPosts[msg.sender].push(newPost);
    }

    function likePost(uint _postId) external {
        allPosts[_postId].likes++;
        likedPosts[msg.sender].push(allPosts[_postId]);
    }

    function commentPost(uint _postId, string memory _comment) external{
        Comments memory _temp=Comments(usernames[msg.sender], _postId, _comment);
        Post storage post = allPosts[_postId];
        post.comments.push(_temp);
        userComments[msg.sender].push(_temp);
    }

    function createUser(string memory _username) external {
        require(!walletExists(msg.sender), "User already exists");
        usernames[msg.sender] = _username;
    }
}