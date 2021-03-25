import { getDirName } from '../../../../lib/utils/index.mjs';
import Tester         from '../../../lib/JsonRPCTester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/main/films-delete/positive`,
    'main/films-delete/positive',
    async ({ config: { useCaseClass, before }, expected }) => {
        const { filmId } = await before(tester.factory);

        await tester.testUseCasePositive({ method: useCaseClass.name, input: { id: filmId }, expected });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/main/films-delete/negative`,
    'main/films-delete/negative',
    async ({ config: { useCaseClass, before }, input, exception }) => {
        await before(tester.factory);
        await tester.testUseCaseNegative({ method: useCaseClass.name, input, exception });
    }
);
