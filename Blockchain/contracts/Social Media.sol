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
    struct User{
        string username;
        address[] followers;
        address[] following;
    }
    mapping(address=>User) public allUsers;
    struct Post {
        string name;
        string description;
        uint postId;
        IERC721 nft;
        uint tokenId;
        string creator;
        uint likes;
        Comments[] comments;
        string contentType;
    }

    uint public postCount = 0;
    mapping(address=>Comments[]) public userComments;
    mapping(address => Post[]) public userPosts;
    mapping(uint => Post) public allPosts;
    mapping(address => Post[]) public likedPosts;
    function returnUser(address _user) public view returns(User memory){
        return allUsers[_user];
    }

    function walletExists(address _wallet) public view returns (bool) {
        return bytes(usernames[_wallet]).length > 0;
    }

    function createPost(IERC721 _nft, uint _tokenId, string memory _contentType, string memory _name, string memory _description) external {
        require(walletExists(msg.sender), "User does not exist");
        
        Post storage newPost = allPosts[postCount];
        newPost.name = _name;
        newPost.description = _description;
        newPost.postId = postCount; 
        newPost.nft = _nft;
        newPost.tokenId = _tokenId;
        newPost.creator = usernames[msg.sender];
        newPost.likes = 0;
        newPost.contentType=_contentType;
        postCount++;
        userPosts[msg.sender].push(newPost);
    }

    function likePost(uint _postId) external {
        allPosts[_postId].likes++;
        likedPosts[msg.sender].push(allPosts[_postId]);
    }
    
    // function unlikePost(uint _postId)
    function isFollowing(address _follower, address _user) internal view returns (bool) {
    User storage user = allUsers[_user];
    for (uint256 i = 0; i < user.followers.length; i++) {
        if (user.followers[i] == _follower) {
            return true;
        }
    }
    
    // If the sender's address is not found in the followers list, return false
    return false;
}
    function followUser(address _user) external {
        require(walletExists(_user), "User doesn't exist");
        require(!isFollowing(msg.sender, _user), "You are already following this user");
        User storage user=allUsers[_user];
        user.followers.push(msg.sender);
        User storage follower=allUsers[msg.sender];
        follower.following.push(_user);
    }

    function commentPost(uint _postId, string memory _comment) external{
        Comments memory _temp=Comments(usernames[msg.sender], _postId, _comment);
        Post storage post = allPosts[_postId];
        post.comments.push(_temp);
        userComments[msg.sender].push(_temp);
    }

    function returnPosts() external view returns(Post[] memory){
        Post[] memory posts=new Post[](postCount);
        for(uint i=0;i<postCount;i++){
            posts[i]=allPosts[i];
        }
        return posts;
    }

    function createUser(string memory _username) external {
        require(!walletExists(msg.sender), "User already exists");
        usernames[msg.sender] = _username;
        User storage newUser=allUsers[msg.sender];
        newUser.username=_username;
    }
    function returnUserPost(address[] memory _users) view external returns(Post[] memory){
        Post[] memory posts=new Post[](postCount);
        uint c=0;
        for(uint i=0;i<_users.length;i++){
            for(uint j=0;j<userPosts[_users[i]].length;j++){
                posts[c]=userPosts[_users[i]][j];
                c++ ;  
            }
        }
        return posts;
    }
    function getPostsForUser(address _user) external view returns (Post[] memory) {
    User storage user = allUsers[_user];
    uint totalFollowing = user.following.length;
    Post[] memory posts = new Post[](postCount);
    uint c=0;
    for (uint i = 0; i < totalFollowing; i++) {
        address followingUser = user.following[i];
        uint totalPosts = userPosts[followingUser].length;
        for (uint j = 0; j < totalPosts; j++) {
            posts[c++]=(userPosts[followingUser][i]);
        }
    }
    
    return posts;
}
}