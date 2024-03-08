const zod = require("zod");

const Schema1 = zod.object({
    title: zod.string(),
    description: zod.string(),
});

const Schema2 = zod.object({
    id: zod.string(),
});

exports.createTodoMiddleware = (req,res,next) => {
    try{
        const valid = Schema1.safeParse(req.body);
        if(!valid.success){
            res.json({
                success: false,
                message: 'Invalid input types',
            })
        }
        next();
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.updateTodoMiddleware = (req,res,next) => {
    try{
        const valid = Schema2.safeParse(req.body);
        if(!valid.success){
            res.json({
                success: false,
                message: 'Invalid input types',
            })
        }
        next();
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};