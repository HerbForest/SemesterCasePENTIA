import { describe, it, expect } from "vitest";
import { buildConversation } from "./builderConversation";

describe('buildConversation', () => {
  const buyer = {
        firstName: 'Anna',
        lastName: 'Sørensen'
  }
	const project = {
        id: 'projekt123',
        address: 'Skrænthen 7, Vejle'
  }
	
	it('returnerer korrekte initialer', () => {
        const result = buildConversation(buyer, project)
        expect(result.initials).toBe('AS')
    })

})