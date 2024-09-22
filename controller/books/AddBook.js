import Book from "../../models/Book.js";

export const AddBook = async(req,res)=>{
    try {
        const {title,author,ISBN,publicationDate,genre,copies} = req.body;
        console.log(req.body)
        if (!title || !author || !ISBN || !publicationDate || !genre || !copies) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const SaveBook = new Book({
            title,
            author,
            ISBN,
            publicationDate,
            genre,
            copies,
        })
        await SaveBook.save();
        res.status(201).json({message:"Book added Successfully",book:SaveBook})
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Book with this ISBN already exists' });
          }
        res.status(500).json({ message: "Internal Server error", error: error.message })
    }

}