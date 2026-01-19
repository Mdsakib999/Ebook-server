import dotenv from 'dotenv';
import connectDB from './config/dbConnect.js';
import Book from './models/book.model.js';

dotenv.config();

const verifyMigration = async () => {
    try {
        await connectDB();

        // Check finding by slug
        const book = await Book.findOne({ slug: 'atomic-habits' });
        if (book) {
            console.log('✅ Verification Successful!');
            console.log(`Found book by slug: "${book.slug}"`);
            console.log(`Title: ${book.bookName}`);
        } else {
            console.log('❌ Verification Failed: Could not find book by slug "atomic-habits"');
        }

        const count = await Book.countDocuments({ slug: { $exists: true, $ne: "" } });
        console.log(`Total books with slugs: ${count}`);

        process.exit(0);
    } catch (error) {
        console.error('Verification Error:', error);
        process.exit(1);
    }
};

verifyMigration();
