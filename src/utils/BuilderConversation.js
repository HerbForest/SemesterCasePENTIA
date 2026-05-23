import { getInitials } from '@/utils/initials';

/**
 * Bygger et samtale objekt til ConversationCard komponenten
 * @param {Object} buyer - Bygherre objekt med firstName, lastName
 * @param {Object} project - Projekt objekt med id, address
 * @returns {Object} Samtale objekt klar til ConversationCard
 */
export const buildConversation = (buyer, project) => {
	return {
		initials: getInitials(buyer.firstName, buyer.lastName),
		name: `${buyer.firstName} ${buyer.lastName}`,
		address: project.address,
		lastMessage: 'Tryk for at se samtalen',
		time: '',
		unread: 0,
		to: { name: 'builderChat', params: { id: project.id } }
	};
};