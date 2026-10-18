import assert from 'node:assert/strict';
import {conceptQuestions,conceptReviews} from '../lib/concept-review';
import {questions} from '../lib/question-bank';
import {topics} from '../lib/study-data';
import {questionHints} from '../lib/question-hints';
assert.equal(conceptQuestions.length,24);
assert.equal(new Set(conceptQuestions.map(q=>q.subject)).size,23);
assert.equal(questions.length,6780);
for(const q of conceptQuestions){assert.ok(q.prompt.length>180,q.id);assert.equal(new Set(q.options).size,4,q.id);assert.equal(topics.find(t=>t.id===q.topic)?.subject,q.subject,q.id);assert.equal(conceptReviews[q.id].reasons.length,4);assert.equal(conceptReviews[q.id].steps.length,4);assert.equal(questionHints(q,'')[0],conceptReviews[q.id].hint);assert.equal(q.answer,(4-(Number(q.id.split('-').at(-1))-1)%4)%4);}
assert.equal(conceptQuestions[1].options[conceptQuestions[1].answer],'O segundo desconto incide sobre R$ 160; o preço final é R$ 144.');
assert.equal(conceptQuestions[7].options[conceptQuestions[7].answer],'0 m/s e 1,5 m/s.');
assert.ok(conceptQuestions[18].options[conceptQuestions[18].answer].startsWith('Mediana de 5'));
assert.ok(conceptQuestions[19].options[conceptQuestions[19].answer].startsWith('O limite vale 4'));
assert.ok(conceptQuestions[22].options[conceptQuestions[22].answer].startsWith('O VPL é zero'));
console.log('24 contextual cases: topic placement, 96 option explanations, hints, four steps and numerical checks passed.');
