package com.omar.Utility;

import java.util.UUID;

public class UniqueStringGenerator {
    public static String generateUniqueString() {
        // Generate a unique identifier
        String uniqueId = UUID.randomUUID().toString();

        // Add a random component to the unique identifier
        String randomComponent = getRandomString(8); // Adjust the length as needed

        // Concatenate the unique identifier and random component
        String uniqueString = uniqueId + randomComponent;

        return uniqueString;
    }

    private static String getRandomString(int length) {
        // Define the characters to choose from for the random component
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            // Generate a random index to choose a character from the characters string
            int randomIndex = (int) (Math.random() * characters.length());

            // Append the randomly chosen character to the result
            sb.append(characters.charAt(randomIndex));
        }

        return sb.toString();
    }
}
