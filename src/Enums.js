let Inputs = {
    Left: "Left",
    Right: "Right",
    Down: "Down",
    Rotate: "Rotate",
    Drop: "Drop"
};

let Types = {
    I: "I",
    O: "O", 
    T: "T",
    S: "S",
    Z: "Z",
    J: "J",
    L: "L"
};

let CollisionType = {
    None: "None",
    Bottom: "Bottom",
    Other: "Other"
};

let Orientations = {
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    next: (or) => {
        switch (or) {
            case Orientations.A:
                return Orientations.B;
            case Orientations.B:
                return Orientations.C;
            case Orientations.C:
                return Orientations.D;
            case Orientations.D:
                return Orientations.A;
        }
    }
}

export {
    Inputs,
    Types,
    CollisionType,
    Orientations
};