//the data store
let usersData = [
    {firstName: "tommy",lastName: "Malcom", email: "test@test.com", id: 102},
    {firstName: "Peter",lastName: "breCht", email: "test2@test2.com", id: 103},
    {firstName: "RoHan",lastName: "sahu", email: "test3@test3.com", id: 104}
];

// a quick utility function
function titleCaseName(str){
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// the object with chainable methods
let userController = {
    currentUser: "",

    findUser: function(userEmail){
        let arrayLength = usersData.length, i;
        for(i=arrayLength-1; i >=0; i--){
            if(usersData[i].email === userEmail){
                this.currentUser = usersData[i];
                break;
            }
        }
        return this;
    },

    formatName: function(){
        if(this.currentUser){
            this.currentUser.fullName = titleCaseName(this.currentUser.firstName) 
                + " " + titleCaseName(this.currentUser.lastName);
        }
        return this;
    },

    createLayout: function(){
        if(this.currentUser){
            this.currentUser.viewData = "Member: " + this.currentUser.fullName + "ID: "
                + this.currentUser.id + "Email: " + this.currentUser.email + " ";
        }
        return this;
    },

    displayUser: function(){
        if(!this.currentUser) return;
        //$(".members-wrapper").append(this.currentUser.viewData);
        //the one commented is a jquery
        //i asked ai to translate it a normal javascript
        const membersWrapper = document.querySelectorAll(".members-wrapper");
        membersWrapper.forEach(wrapper => {
            wrapper.insertAdjacentHTML("beforeend", this.currentUser.viewData);
        }); 
    }
};

const button = document.querySelector(".output");
button.addEventListener("click", (event) => {
    userController.findUser("test2@test2.com").formatName().createLayout().displayUser();
})
