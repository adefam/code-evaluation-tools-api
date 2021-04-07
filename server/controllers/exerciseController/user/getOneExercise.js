const { Exercise } = require('../../../models');

exports.getOneExercise = async (req, res) => {
    try {
        const uuid = req.params.id;

        const exercise = await Exercise.findByPk(uuid);

        if (!exercise) {
            return res.status(404).send({
                status: "fail",
                message: "exercise not found",
            })
        }

        return res.status(200).send({
            status: "success",
            message: "exercise data sucessfully fetched",
            data: {
                id: exercise.uuid,
                title: exercise.title,
                body: exercise.body,
                hint: exercise.hint,
            }
        })

    } catch (error) {
        return res.status(500).send({
            status: 'fail',
            message: 'error in fetching exercise data',
        });
    }
};
