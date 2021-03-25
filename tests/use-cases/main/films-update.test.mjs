import { getDirName } from '../../../lib/utils/index.mjs';
import Tester         from '../../lib/UseCaseTester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/main/films-update/positive`,
    'main/films-update/positive',
    async ({ config: { useCaseClass, before }, expected, input }) => {
        const { filmId } = await before(tester.factory);

        await tester.testUseCasePositive({
            useCaseClass,
            input : { ...input, id: filmId },
            expected
        });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/main/films-update/negative`,
    'main/films-update/negative',
    async ({ config: { useCaseClass, before }, input, exception }) => {
        const { filmId } = await before(tester.factory);

        await tester.testUseCaseNegative({
            useCaseClass,
            input : { ...input, id: input.id || filmId },
            exception
        });
    }
);
