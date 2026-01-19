import dotenv from 'dotenv';
import connectDB from './config/dbConnect.js';
import Book from './models/book.model.js';
import { slugify } from './utilities/slugify.js';

dotenv.config();

const migrateSlugs = async () => {
    try {
        await connectDB();
        console.log('Connected to database...');

        const books = await Book.find({});
        console.log(`Found ${books.length} books to process.`);

        let updatedCount = 0;
        let errorCount = 0;
        let skippedCount = 0;

        for (const book of books) {
            // Check if slug is missing or empty
            if (!book.slug) {
                try {
                    const baseSlug = slugify(book.bookName);
                    let uniqueSlug = baseSlug;

                    // Simple collision resolution helper could be added here if needed,
                    // but relying on the user's logic first.
                    // If we encounter a duplicate error, we can catch it.

                    book.slug = uniqueSlug;

                    await book.save({ validateBeforeSave: false });
                    console.log(`✅ Updated: "${book.bookName}" -> "${book.slug}"`);
                    updatedCount++;
                } catch (err) {
                    if (err.code === 11000) {
                        console.error(`❌ Duplicate slug error for "${book.bookName}": Slug "${slugify(book.bookName)}" already exists.`);
                        // Option: Try appending ID or random string? 
                        // For now just logging error.
                    } else {
                        console.error(`❌ Failed to update "${book.bookName}": ${err.message}`);
                    }
                    errorCount++;
                }
            } else {
                skippedCount++;
            }
        }

        console.log('\n--- Migration Summary ---');
        console.log(`Total Books: ${books.length}`);
        console.log(`Updated: ${updatedCount}`);
        console.log(`Skipped (already had slug): ${skippedCount}`);
        console.log(`Errors: ${errorCount}`);

        process.exit(0);
    } catch (error) {
        console.error('Fatal Migration Error:', error);
        process.exit(1);
    }
};

migrateSlugs();
