function Observer() {
    this.targets = new Map();
    this.trigger = function(actions) {
        actions.forEach(a => {
            if (a.isIntersecting) {
                const _ = this.targets.get(a.target);
                _.action.call(_.context);
                this.deleteTarget(a.target);
            }
        })
    }
    this.observer = new IntersectionObserver(this.trigger.bind(this));

    this.addTarget = function(target, action, context) {
        this.targets.set(target, {
            action,
            context,
        });
        this.observer.observe(target);
    }

    this.deleteTarget = function(target) {
        this.observer.unobserve(target);
        this.targets.delete(target);
    }
}

const observer = new Observer();
export default observer;
