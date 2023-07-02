---
to: src/utils/<%= function_name %>/<%= function_name %>.test.ts
---
import { <%= function_name %> } from './<%= function_name %>'

describe('<%= function_name %>', () => {
	test('', () => {
		expect(<%= function_name %>()).toBe()
	})
})
