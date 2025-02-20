class Todo{
    constructor(id, title, description,){
        this.id =id;
        this.title =title;
        this.description =description;
        this.CreatedAt = new Date();
    }
}

module.exports = Todo;