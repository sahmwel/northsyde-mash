import { prisma } from '../../prisma.js';  // import shared client

export const getEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            orderBy: { date: 'desc' },
            include: { creator: { select: { email: true } } }
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await prisma.event.findUnique({
            where: { id },
            include: { creator: { select: { email: true } } }
        });

        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, imageUrl, isFeatured } = req.body;

        const event = await prisma.event.create({
            data: {
                title,
                description,
                date: new Date(date),        // fixed: new Date(...)
                location,
                imageUrl,
                isFeatured: isFeatured || false,
                createdBy: req.user.id
            }
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, location, imageUrl, isFeatured } = req.body;

        const existingEvent = await prisma.event.findUnique({ where: { id } });
        if (!existingEvent) return res.status(404).json({ error: 'Event not found' });

        const event = await prisma.event.update({
            where: { id },                     // fixed: { id }, not [ id ]
            data: {
                title,
                description,
                date: date ? new Date(date) : undefined,
                location,
                imageUrl,
                isFeatured
            }
        });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const existingEvent = await prisma.event.findUnique({ where: { id } });
        if (!existingEvent) return res.status(404).json({ error: 'Event not found' });

        await prisma.event.delete({ where: { id } });   // fixed: { id }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};