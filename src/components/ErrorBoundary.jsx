import * as React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        console.log('⚠️getDerivedStateFromError :⚠️');
        console.log('⚠️Error DSFE', error);
        return { hasError: true };
    }

    /** Спрацьовує, коли чілд-компонент (з далекими чілдами включно) викидує помилку.
     * @param {Error?} error - помилка, яка викидується (не обов'язково Error)
     * @param {*} info - об'єкт, що містить додаткову інфу по помилці.
     * @returns немає
     */
    componentDidCatch(error, info) {
        console.log('⚠️componentDidCatch :⚠️');
        console.log('⚠️Error DC ', error);
        console.log('⚠️ComponentStack', info.componentStack);

        // logErrorToMyService(
        //   error,
        //   // Example "componentStack":
        //   //   in ComponentThatThrows (created by App)
        //   //   in ErrorBoundary (created by App)
        //   //   in div (created by App)
        //   //   in App
        //   info.componentStack,
        //   // Warning: `captureOwnerStack` is not available in production.
        //   React.captureOwnerStack(),
        // );
    }

    /** Викликається, коли компонент доданий на екран. Стандартне місце для fetch data, установки підписок
     * та маніпуляцією з DOM-гілками
     * @param немає
     * @returns немає
     */
    componentDidMount() {
        console.log('🐧componentDidMount🐧')
    }

    /** Викликається негайно, як тільки пройшов ре-рендер компонента з оновленими станами чи пропсами
     * Використовується для маніпуляції DOM після оновлення
     * 
     * @param {*} prevProps - пропс до оновлення (можна порівняти з this.props)
     * @param {*} prevState - стан до оновлення (можна порівняти з this.state)
     * @param {*} snapshot - вихідне значення, що повертається з методу. Інакше це undefined.
     * @returns немає
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('🐧componentDidUpdate🐧: prevProps =', prevProps);
        console.log('🐧componentDidUpdate🐧: prevState =', prevState);
        console.log('🐧componentDidUpdate🐧: snapshot =', snapshot);
    }

    /** Перейменовано у UNSAFE_componentWillMount */
    componentWillMount() {
        console.log('🐧componentWillMount🐧');
    }

    /** Перейменовано у UNSAFE_componentWillReceiveProps */
    componentWillReceiveProps(nextProps) {
        console.log('🐧componentWillReceiveProps🐧: nextProps =', nextProps);
    }

    /** Перейменовано у UNSAFE_componentWillUpdate */
    componentWillUpdate(nextProps, nextState) {
        console.log('🐧componentWillUpdate🐧: nextProps =', nextProps);
        console.log('🐧componentWillUpdate🐧: nextState =', nextState);
    }

    /** Викликаєтся перед тим, як компонент буде видалений з екрану.
     * Це стандартне місце для припинення fetch або видалення підписок
     * 
     * @param немає
     * @returns немає
     */
    componentWillUnmount() {
        console.log('🐧componentWillUnmount🐧');
    }

    /** Примусовий ре-рендерінг компоненту.
     * Якщо метод читає тільки this.props, this.state або this.context, то в цьому немає змісту.
     * Краще працює, якщо треба прив'язатися до зовнішнього джерела.
     * 
     * @param {*} callback - зворотній виклик
     * @returns немає
     */
    forceUpdate(callback) {
        console.log('🐧forceUpdate🐧: callback =', callback);
    }

    /** Викликається негайно перед оновленням DOM.
     * Будь-яке вихідне значення передається у якості параметру у *componentDidUpdate*
     * @param {*} prevProps - пропс перед оновленням 
     * @param {*} prevState - стан перед оновленням
     * @returns повертає знімок будь-якого типу
     */
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('🐧getSnapshotBeforeUpdate🐧: prevProps =', prevProps);
        console.log('🐧getSnapshotBeforeUpdate🐧: prevState =', prevState);

        return null;
    }

    static getDerivedStateFromProps(props, state) {
        console.log('🐧getDerivedStateFromProps🐧: props =', props);
        console.log('🐧getDerivedStateFromProps🐧: state =', state);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.fallback;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;