export function structureRole(role: any, roleQuestions: any) {
    return {
        id: role.id,
        focus: role.description,
        role: role.name,
        flashcards: structureQuestions(roleQuestions)
    }
}
const keys = ["A", "B", "C", "D"]
function structureQuestions(roleQuestions: any) {
    return roleQuestions.map((q: any) => {
        return {
            id: q.id,
            question: q.question,
            rationale: q.rationale,
            options: {
                "A": q.answers[0].answer,
                "B": q.answers[1].answer,
                "C": q.answers[2].answer,
                "D": q.answers[3].answer,
            },
            answer: keys[q.answers.filter((ans: any) => ans.is_correct)[0].display_order - 1]
        }
    });
}