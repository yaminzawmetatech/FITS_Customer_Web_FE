/**
 * Check null or blank
 *
 * @param num
 * @reutrn True (has value) | False (null or blank)
 */
export function checkNullOrBlank(value) {
    if (value === '' || value === null) {
        return false;
    }
    return true;
}