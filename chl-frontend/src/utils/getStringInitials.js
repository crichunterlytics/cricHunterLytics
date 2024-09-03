export const getInitials = (name) => {
    // Split the input string by spaces to get individual words
    const words = name.trim().split(" ");

     // If there's only one word, return the first three letters
    if (words.length === 1) {
        return name.substring(0, 3).toUpperCase();
    }
    
    // Map over the words array, returning the first character of each word
    // Convert each character to uppercase to handle mixed cases
    const initials = words.map(word => word.charAt(0).toUpperCase());
    
    // Join the initials array into a single string
    return initials.join("");
}
