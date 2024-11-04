// pages/api/addresses.js
import { Address } from '../../models/address'; // Adjust the path as necessary

let addresses = []; // Mock database for demonstration

const addressesHandler = (req, res) => {
    const { method } = req;
    
    switch (method) {
        case 'GET':
            res.status(200).json(addresses);
            break;
        case 'POST':
            const { userId, addressLine1, addressLine2, city, state, zipCode, country, isDefault } = req.body;
            const newAddress = new Address(
                Date.now().toString(), // Example ID, you might want to use a proper ID generator
                userId,
                addressLine1,
                addressLine2,
                city,
                state,
                zipCode,
                country,
                isDefault
            );
            addresses.push(newAddress);
            res.status(201).json(newAddress);
            break;
        // Implement other methods (PUT, DELETE) as needed
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};

export default addressesHandler;
