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

    // CHECK MEMO ID VALIDITY
    if(mongoose.Types.ObjectId.isValid(req.params.id)) {
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
        memo.save(err => {
            if(err) throw err;
            return res.json({
                success: true
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
router.get('/list/:page', (req, res) => {
    /*
    Memo.find((err, memos) => {
        if(err) throw err;
        res.json(memos);
    });
    */
    let page = parseInt(req.params.page);

    Memo.find()
    .sort({"date.edited": -1})
    .skip((page-1) * 5)
    .limit(5)
    .exec((err, memos) => {
        if(err) throw err;
        res.json(memos);
    });

});

export default router;
