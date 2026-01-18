import dotenv from "dotenv";
import mongoose from "mongoose";
import Book from "./models/book.model.js";

dotenv.config();

const books = [
    {
        "_id": "684000000000000000000001",
        "bookName": "tiny habits for big change",
        "authorName": "peter norman",
        "description": "Simple routines to create lasting improvements in daily life.",
        "price": 12.99,
        "discountPrice": 9.99,
        "rating": 4.2,
        "image": "/BookImages/book-21.png",
        "category": "SELF-HELP",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "684000000000000000000002",
        "bookName": "the thinking mind",
        "authorName": "lara mitchell",
        "description": "A short guide to critical thinking and better decisions.",
        "price": 14,
        "discountPrice": null,
        "rating": 4.0,
        "image": "/BookImages/book-22.png",
        "category": "PHILOSHPY",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "684000000000000000000003",
        "bookName": "rivers of our past",
        "authorName": "omar hussain",
        "description": "Exploring ancient civilisations and the waterways that shaped them.",
        "price": 18.5,
        "discountPrice": 15,
        "rating": 4.5,
        "image": "/BookImages/book-23.png",
        "category": "HISTORY",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "684000000000000000000004",
        "bookName": "the quiet garden",
        "authorName": "emma riley",
        "description": "A warm novel about family, loss and the slow return of hope.",
        "price": 11.99,
        "discountPrice": 8.99,
        "rating": 4.1,
        "image": "/BookImages/book-24.png",
        "category": "FICTION",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "684000000000000000000005",
        "bookName": "memoirs of a late summer",
        "authorName": "samir ahmed",
        "description": "A personal memoir of travel, family and change across seasons.",
        "price": 16,
        "discountPrice": null,
        "rating": 4.3,
        "image": "/BookImages/book-25.png",
        "category": "MMOIR",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "684000000000000000000006",
        "bookName": "habit stacking at work",
        "authorName": "nina choi",
        "description": "Practical micro-habits to boost focus and productivity on the job.",
        "price": 13.5,
        "discountPrice": 10,
        "rating": 4.6,
        "image": "/BookImages/book-26.png",
        "category": "SELF-HELP",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "684000000000000000000007",
        "bookName": "ethics for everyday life",
        "authorName": "d. a. ramos",
        "description": "Short essays on moral choices we face daily.",
        "price": 15,
        "discountPrice": null,
        "rating": 3.9,
        "image": "/BookImages/book-27.png",
        "category": "PHILOSHPY",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "684000000000000000000008",
        "bookName": "cities that built the world",
        "authorName": "leena varma",
        "description": "A lively history of major cities and their global influence.",
        "price": 22,
        "discountPrice": 18,
        "rating": 4.7,
        "image": "/BookImages/book-28.png",
        "category": "HISTORY",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "684000000000000000000009",
        "bookName": "the lighthouse keeper",
        "authorName": "ralph kent",
        "description": "A coastal mystery about secrets and a small-town community.",
        "price": 10.99,
        "discountPrice": 7.99,
        "rating": 4.0,
        "image": "/BookImages/book-29.png",
        "category": "FICTION",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "68400000000000000000000a",
        "bookName": "childhood summers",
        "authorName": "maya singh",
        "description": "Personal recollections of growing up in a seaside town.",
        "price": 14.5,
        "discountPrice": null,
        "rating": 4.2,
        "image": "/BookImages/book-30.png",
        "category": "MMOIR",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "68400000000000000000000b",
        "bookName": "small wins, big results",
        "authorName": "adrian cole",
        "description": "How tiny daily actions compound into major life changes.",
        "price": 9.99,
        "discountPrice": 7.49,
        "rating": 4.4,
        "image": "/BookImages/book-31.png",
        "category": "SELF-HELP",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "68400000000000000000000c",
        "bookName": "questions of being",
        "authorName": "hana elbaz",
        "description": "An accessible introduction to metaphysics for curious readers.",
        "price": 17,
        "discountPrice": null,
        "rating": 3.8,
        "image": "/BookImages/book-32.png",
        "category": "PHILOSHPY",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "68400000000000000000000d",
        "bookName": "empire and sea",
        "authorName": "victor oliver",
        "description": "Naval history and the role of maritime trade in empire building.",
        "price": 20,
        "discountPrice": 16,
        "rating": 4.6,
        "image": "/BookImages/book-33.png",
        "category": "HISTORY",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "68400000000000000000000e",
        "bookName": "a house of paper",
        "authorName": "zoe parker",
        "description": "An inventive contemporary fiction exploring memory and art.",
        "price": 13.99,
        "discountPrice": null,
        "rating": 4.1,
        "image": "/BookImages/book-34.png",
        "category": "FICTION",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "68400000000000000000000f",
        "bookName": "walking back home",
        "authorName": "khaled mansur",
        "description": "Memoir of a long walk across a homeland and inner landscapes.",
        "price": 18.75,
        "discountPrice": 14.99,
        "rating": 4.5,
        "image": "/BookImages/book-35.png",
        "category": "MMOIR",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "684000000000000000000010",
        "bookName": "focus and flow",
        "authorName": "sara gilbert",
        "description": "Techniques for cultivating deep work and avoiding distraction.",
        "price": 11.5,
        "discountPrice": 8.5,
        "rating": 4.3,
        "image": "/BookImages/book-36.png",
        "category": "SELF-HELP",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "684000000000000000000011",
        "bookName": "logic made simple",
        "authorName": "benoit moreau",
        "description": "Practical logic and reasoning for everyday problem solving.",
        "price": 15.25,
        "discountPrice": null,
        "rating": 3.9,
        "image": "/BookImages/book-37.png",
        "category": "PHILOSHPY",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "684000000000000000000012",
        "bookName": "secrets of the silk road",
        "authorName": "amina sherif",
        "description": "A cultural history of trade routes and exchange over centuries.",
        "price": 19.99,
        "discountPrice": 15.99,
        "rating": 4.7,
        "image": "/BookImages/book-38.png",
        "category": "HISTORY",
        "pdf": "https://example.com/placeholder.pdf"
    },
    {
        "_id": "684000000000000000000013",
        "bookName": "paper towns revisited",
        "authorName": "elliot ray",
        "description": "A lyrical novel about lost places and found selves.",
        "price": 12.49,
        "discountPrice": 9.99,
        "rating": 4.0,
        "image": "/BookImages/book-39.png",
        "category": "FICTION",
        "pdf": "https://example.com/placeholder.pdf"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB");

        // Optional: clear existing books if needed, or just insert. 
        // User asked to "insert relevent missing images" and provided a list.
        // Assuming we just want to upsert or insert these unique ones.
        // Using insertMany with unordered to continue on error if duplicates exist.

        try {
            await Book.insertMany(books, { ordered: false });
            console.log("Books Inserted Successfully");
        } catch (e) {
            console.log("Some books might already exist. details:", e.message);
        }

        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding DB:", error);
        process.exit(1);
    }
};

seedDB();
