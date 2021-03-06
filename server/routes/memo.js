import express from 'express';
import Memo from '../models/memo';
import mongoose from 'mongoose';


const router = express.Router();

// WRITE MEMO
router.post('/', (req, res) => {


    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if(typeof req.body.contents === 'undefined') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    } else if(req.body.contents === "" || req.body.contents === null) {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CREATE NEW MEMO
    let memo = new Memo({
        writer: req.session.loginInfo.username,
        contents: req.body.contents
    });

    // SAVE IN DATABASE
    memo.save( err => {
        if(err) throw err;
        return res.json({ success: true });
    });
});

// MODIFY MEMO
router.put('/:id', (req, res) => {

    // CHECK CONTENTS VALID
    if(typeof req.body.contents === 'undefined') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 0
        });
    } else if(req.body.contents === "" || req.body.contents === null) {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 0
        });
    }

    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // FIND MEMO
    Memo.findById(req.params.id, (err, memo) => {
        if(err) throw err;

        // IF THERE IS NO MEMO, POST A NEW ONE
        if(!memo) {
            let newMemo = new Memo({
                writer: req.session.loginInfo.username,
                contents: req.body.contents
            });

            memo.save( err => {
                if(err) throw err;
                return res.json({ success: true });
            });
        }

        // IF EXISTS, CHECK WRITER
        if(memo.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 3
            });
        }

        // MODIFY AND SAVE IN DATABASE
        memo.contents = req.body.contents;
        memo.date.edited = new Date();
        memo.is_edited = true;
        memo.save((err, memo) => {
            if(err) throw err;
            return res.json({
                success: true,
                memo
            });
        });

    });
});


// DELETE MEMO
router.delete('/:id', (req, res) => {
    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 0
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // FIND MEMO AND CHECK FOR WRITER
    Memo.findById(req.params.id, (err, memo) => {
        if(err) throw err;

        if(!memo) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 2
            });
        }
        if(memo.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 3
            });
        }

        // REMOVE THE MEMO
        Memo.remove({ _id: req.params.id }, err => {
            if(err) throw err;
            res.json({ success: true });
        });
    });

});

// GET MEMO LIST
router.get('/list', (req, res) => {
    /*
    Memo.find((err, memos) => {
        if(err) throw err;
        res.json(memos);
    });
    */
    Memo.find()
    .sort({"_id": -1})
    .limit(6)
    .exec((err, memos) => {
        if(err) throw err;
        res.json(memos);
    });

});


// GET OLDER MEMO LIST
router.get('/list/old/:id', (req, res) => {
    /*
    Memo.find((err, memos) => {
        if(err) throw err;
        res.json(memos);
    });
    */
    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 0
        });
    }

    let objId = new mongoose.Types.ObjectId(req.params.id);

    Memo.find({ _id: { $lt: objId }})
    .sort({_id: -1})
    .limit(6)
    .exec((err, memos) => {
        if(err) throw err;
        res.json(memos);
    });

});


// GET NEWER MEMO LIST
router.get('/list/new/:id', (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 0
        });
    }

    let objId = new mongoose.Types.ObjectId(req.params.id);

    Memo.find({ _id: { $gt: objId }})
    .sort({_id: -1})
    .limit(6)
    .exec((err, memos) => {
        if(err) throw err;
        res.json(memos);
    });

});

// GET MEMO LIST OF A USER
router.get('/list/:user', (req, res) => {
    /*
    Memo.find((err, memos) => {
        if(err) throw err;
        res.json(memos);
    });
    */
    Memo.find({writer: req.params.user})
    .sort({"_id": -1})
    .limit(6)
    .exec((err, memos) => {
        if(err) throw err;
        res.json(memos);
    });

});


// GET OLDER MEMO LIST OF A USER
router.get('/list/old/:user/:id', (req, res) => {
    /*
    Memo.find((err, memos) => {
        if(err) throw err;
        res.json(memos);
    });
    */
    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 0
        });
    }

    let objId = new mongoose.Types.ObjectId(req.params.id);

    Memo.find({
        _id: { $lt: objId },
        writer: req.params.user
    })
    .sort({_id: -1})
    .limit(6)
    .exec((err, memos) => {
        if(err) throw err;
        res.json(memos);
    });

});


// GET NEWER MEMO LIST OF A USER
router.get('/list/new/:user/:id', (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 0
        });
    }

    let objId = new mongoose.Types.ObjectId(req.params.id);

    Memo.find({
        _id: { $gt: objId },
        writer: req.params.user
    })
    .sort({_id: -1})
    .limit(6)
    .exec((err, memos) => {
        if(err) throw err;
        res.json(memos);
    });

});


// TOGGLES THE STAR OF THE MEMO
router.post('/star/:id', (req, res) => {
    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 0
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // FIND MEMO AND CHECK FOR WRITER
    Memo.findById(req.params.id, (err, memo) => {
        if(err) throw err;

        if(!memo) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 2
            });
        }

        // GET INDEX OF USERNAME IN THE ARRAY
        let index = memo.starred.indexOf(req.session.loginInfo.username);

        let hasStarred = (index === -1) ? false : true;

        if(!hasStarred) {
            // IF IT DOES NOT EXIST
            memo.starred.push(req.session.loginInfo.username);
        } else {
            // ALREADY starred
            memo.starred.splice(index, 1);
        }

        // SAVE THE MEMO
        memo.save((err, memo) => {
            if(err) throw err;
            res.json({
                success: true,
                'has_starred': !hasStarred,
                memo,
            });
        });
    });
});

export default router;
